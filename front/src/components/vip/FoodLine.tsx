import kakaomapImage from "../../assets/kakaomap.png";

export default function FoodLine() {
  return (
    <div className="w-[50vw] h-[20vh] border-2 border-gray-300 rounded-xl flex p-3 shadow-md ">
      {/* ALERT width와 height는 확인용으로 넣은 것으로 추후 수정. */}
      <div className="flex place-items-center">
        <div className="w-[15vh] h-[15vh] ms-6 mr-3 ">
          <img
            src="https://picsum.photos/40/40"
            className="w-full h-full rounded-[40px] "
            alt="empty"
          />
        </div>
        <div className="flex flex-col w-[30vw]">
          <div className="flex m-1 text-2xl font-semibold">
            우리 가게에 공짜란 없다
          </div>
          <div className="flex items-center m-1 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <div>대전광역시 유성구 대전광역시 유성구 대학로151번길 51</div>
          </div>
          <div className="flex items-center m-1 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1 rotate-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <div>010-0000-0000</div>
          </div>
        </div>
        <div className="">
          <div>
            <button
              type="button"
              aria-label="Add to favorites"
              className="w-10 h-10"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button>
              <img
                src={kakaomapImage}
                width="40"
                height="40"
                alt="kakaomap"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
