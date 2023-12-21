"use client";
import { Consumer } from "@/Provider";
import EditorCode from "@/components/EditorCode";
import Preview from "@/components/Preview";
import ConfigModal from "@/components/ConfigModal";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Consumer>
        {(store) => (
          <div className="flex flex-row justify-between w-full gap-5 p-5">
            <EditorCode {...store} />
            <Preview {...store} />
            <ConfigModal {...store} />
          </div>
        )}
      </Consumer>
    </main>
  );
}
