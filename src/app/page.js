"use client";
import { Consumer } from "@/Provider";
import EditorCode from "@/components/EditorCode";
import Preview from "@/components/Preview";
import ConfigModal from "@/components/ConfigModal";
import InsideView from "@/components/InsideView";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Consumer>
        {(store) => (
          <>
            <div className="flex flex-col justify-between w-full gap-5 p-5 md:flex-row md:h-2/4">
              <EditorCode {...store} />
              <Preview {...store} />
              <ConfigModal {...store} />
            </div>
            <div className="w-full">
              <InsideView {...store} />
            </div>
          </>
        )}
      </Consumer>
      <a href="https://www.linkedin.com/in/rohan-patel-%F0%9F%87%AE%F0%9F%87%B3-18a7091ab/">
        Rohan Patel
      </a>
    </main>
  );
}
