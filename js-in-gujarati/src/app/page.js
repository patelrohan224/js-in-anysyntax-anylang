"use client";
import { Consumer } from "@/Provider";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Consumer>
        {(store) => (
          <div className="flex flex-row justify-between w-full gap-5 p-5">
            <Editor {...store} />
            <Preview {...store} />
          </div>
        )}
      </Consumer>
    </main>
  );
}
