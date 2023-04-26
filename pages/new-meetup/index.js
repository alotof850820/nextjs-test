//com/new-meetup
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (inputMeetupData) => {
    //fetch /api/new-meetup MongoDB
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(inputMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);

    //導向初始頁面
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add newe meetup</title>
        <meta name="description" content="add your own meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
