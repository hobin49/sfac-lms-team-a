"use client";
import Image from "next/image";
import { Lecture } from "@/types/firebase.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updatePlayLecture } from "@/redux/lectureSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 강의 리스트 항목
const LectureItem = ({ item, index }: { item: Lecture; index: number }) => {
  const { title, lectureContent, startDate, endDate, lectureType, id } = item;
  const router = useRouter();
  const playLectureStore = useSelector(
    (store: RootState) => store.nowPlayLecture,
  );

  // console.log("playLectureStore", playLectureStore);

  const dispatch = useDispatch();

  const onClickLectureItem = () => {
    dispatch(
      updatePlayLecture({
        nowPlayIndex: index,
        nowPlayLectureId: id,
      }),
    );
  };
  useEffect(() => {
    if (playLectureStore.nowPlayLectureId === id) {
      router.push("/lectureHall");
    }
  }, [playLectureStore]);
  const lectureIcon =
    lectureType === "노트" ? "📒" : lectureType === "비디오" ? "🎬" : "🔗";

  return (
    <div key={item.id} className="border rounded-lg flex h-40 py-5 px-7">
      <div>
        <Image
          src="/images/logo.svg"
          width={216}
          height={132}
          alt={title}
          className="mr-5 h-full rounded-lg bg-slate-200"
        />
      </div>
      <div className="mr-20 flex flex-col justify-evenly grow">
        <span className="w-10 text-xs bg-grayscale-5 px-2.5 py-1 rounded-md text-center">
          {lectureContent.videoLength}분
        </span>
        <h3 className="text-base font-bold">
          {`${lectureIcon} ` + `${title}`}
        </h3>
        <div className="text-xs font-medium">
          [수강기간]
          <p>
            {startDate.seconds}~{endDate.seconds}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-sm text-right">
          <button className="b mr-1">수정</button>
          <button onClick={() => {}}>삭제</button>
        </div>
        <button
          className="bg-grayscale-5 px-14 py-2 rounded-lg"
          onClick={onClickLectureItem}
        >
          {lectureType}보기
        </button>
      </div>
    </div>
  );
};

export default LectureItem;
