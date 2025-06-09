// import notifee, {TimestampTrigger, TriggerType} from "@notifee/react-native";
// import Toast from "react-native-toast-message";

// export const scheduleNotification = async (plan: {time: string; title: string; body: string}) => {
//   // 알림 권한 요청
//   const settings = await notifee.requestPermission();

//   if (settings.authorizationStatus >= 1) {
//     try {
//       // 알림 트리거 시간 설정
//       const trigger: TimestampTrigger = {
//         type: TriggerType.TIMESTAMP,
//         timestamp: new Date(plan.time).getTime(), // 밀리초로 변환
//       };

//       // 알림 생성
//       await notifee.createTriggerNotification(
//         {
//           title: plan.title || "알림 제목",
//           body: plan.body || "알림 내용",
//           android: {
//             channelId: "default",
//             smallIcon: "ic_launcher", // 프로젝트에서 정의한 아이콘
//             color: "#4caf50",
//           },
//         },
//         trigger,
//       );

//       console.log("알림 예약 완료:", plan.time);
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: error.message,
//       });
//     }
//   } else {
//     console.error("알림 권한이 필요합니다.");
//   }
// };
