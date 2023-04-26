import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

//因static render是render component前生成
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test1234:test1234@atlascluster.gntnzi1.mongodb.net/test"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //get all data on mongodb
  //_id: 1不包刮其他段值
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    //每個{}就是一個meetupId
    //通常是fetch後端data
    fallback: false, //表示paths中是否包含所有參數(false)或只是一部份
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

//此頁面需要data
//static render
export const getStaticProps = async (context) => {
  //fetcj data
  //url id值(這裡不能用useRoute) //meetupId是在render coponent生成的
  // console.log(context);//呈現至terminal
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://test1234:test1234@atlascluster.gntnzi1.mongodb.net/test"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetups = await meetupsCollection.findOne({
    //meetupId 转换为 MongoDB 中的 ObjectId 类型，以便在使用 _id 查询文档时能够正确地匹配 _id 字段的数据类型。
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        description: selectedMeetups.description,
        image: selectedMeetups.image,
      },
    },
  };
};

export default MeetupDetails;
