import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React app</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

//較慢
//<server side render> run on server
//每一接收req都會更新
// export const getServerSideProps = async (context) => {
//   //每次接收更新
//   const req = context.req;
//   const res = context.res;
//   //fetch API
//   return {
//     //一定是porps 等於HomePage的參數
//     props: {
//       meetups: FAKE_MEETUP,
//     },
//   };
// };

//較快
//<static render> run on client在pre render時執行，只為當前頁面提供
//在執行component前同步執行!!!!!!!
//good for SEO
export const getStaticProps = async () => {
  //fetch api
  const client = await MongoClient.connect(
    "mongodb+srv://test1234:test1234@atlascluster.gntnzi1.mongodb.net/test"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title, //meetups為mongoDB的物件
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })), //一定是porps 等於HomePage的參數
    },
    revalidate: 10, //(收到req每隔10秒更新一次page)(不針對每req而更新)
  };
};

export default HomePage;
