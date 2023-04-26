(() => {
var exports = {};
exports.id = 549;
exports.ids = [549];
exports.modules = {

/***/ 3780:
/***/ ((module) => {

// Exports
module.exports = {
	"detail": "MeetupDetail_detail__HjAUt"
};


/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _meetupId_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/meetups/MeetupDetail.module.css
var MeetupDetail_module = __webpack_require__(3780);
var MeetupDetail_module_default = /*#__PURE__*/__webpack_require__.n(MeetupDetail_module);
;// CONCATENATED MODULE: ./components/meetups/MeetupDetail.js



const MeetupDetail = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: (MeetupDetail_module_default()).detail,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: props.image,
                alt: props.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: props.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("address", {
                children: props.address
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: props.description
            })
        ]
    });
};
/* harmony default export */ const meetups_MeetupDetail = (MeetupDetail);

// EXTERNAL MODULE: external "mongodb"
var external_mongodb_ = __webpack_require__(8013);
;// CONCATENATED MODULE: ./pages/[meetupId]/index.js



const MeetupDetails = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Head, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: props.meetupData.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: props.meetupData.description
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(meetups_MeetupDetail, {
                image: props.meetupData.image,
                title: props.meetupData.title,
                address: props.meetupData.address,
                description: props.meetupData.description
            })
        ]
    });
};
//因static render是render component前生成
const getStaticPaths = async ()=>{
    const client = await external_mongodb_.MongoClient.connect("mongodb+srv://test1234:test1234@atlascluster.gntnzi1.mongodb.net/test");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    //get all data on mongodb
    //_id: 1不包刮其他段值
    const meetups = await meetupsCollection.find({}, {
        _id: 1
    }).toArray();
    client.close();
    return {
        //每個{}就是一個meetupId
        //通常是fetch後端data
        fallback: false,
        paths: meetups.map((meetup)=>({
                params: {
                    meetupId: meetup._id.toString()
                }
            }))
    };
};
//此頁面需要data
//static render
const getStaticProps = async (context)=>{
    //fetcj data
    //url id值(這裡不能用useRoute) //meetupId是在render coponent生成的
    // console.log(context);//呈現至terminal
    const meetupId = context.params.meetupId;
    const client = await external_mongodb_.MongoClient.connect("mongodb+srv://test1234:test1234@atlascluster.gntnzi1.mongodb.net/test");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetups = await meetupsCollection.findOne({
        //meetupId 转换为 MongoDB 中的 ObjectId 类型，以便在使用 _id 查询文档时能够正确地匹配 _id 字段的数据类型。
        _id: new external_mongodb_.ObjectId(meetupId)
    });
    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
                image: selectedMeetups.image
            }
        }
    };
};
/* harmony default export */ const _meetupId_ = (MeetupDetails);


/***/ }),

/***/ 8013:
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8721));
module.exports = __webpack_exports__;

})();