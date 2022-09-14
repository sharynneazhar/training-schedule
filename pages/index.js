import Head from "next/head";
import { find } from "lodash";
import data from "../data/workouts.json";

export default function Home() {
  const buildRows = () => {
    const rows = [...Array(Math.ceil(data.workouts.length / 6))];
    const tableRows = rows.map((row, idx) =>
      data.workouts.slice(idx * 6, idx * 6 + 6)
    );

    return tableRows.map((row, idx) => (
      <tr key={idx} class="border-b dark:border-gray-700 align-top">
        {row.map((cell, idx) => {
          const warmupContent = cell.warmup?.split("\n");
          const workoutContent = cell.workout_item_ids?.map((item) => {
            const row = find(data.workout_items, { id: item });
            return {
              name: row.name,
              info: row.info,
            };
          });

          return (
            <td key={idx} class="py-4 px-6 min-w-[300px]">
              {warmupContent && (
                <>
                  <h3 class="mb-2 text-lg font-bold dark:text-white">Warmup</h3>
                  <ul class="space-y-1 max-w-md list-none list-inside text-gray-500 dark:text-gray-400">
                    {warmupContent.map((c, idx) => (
                      <li key="idx">{c.trim()}</li>
                    ))}
                  </ul>
                </>
              )}
              {workoutContent && (
                <>
                  <h3 class="mt-5 mb-2 text-lg font-bold dark:text-white">
                    Workout
                  </h3>
                  {workoutContent.map((content, idx) => (
                    <div key={idx} class="mb-6">
                      <p class="dark:text-gray-200 font-semibold">
                        {content.name.trim()}
                      </p>
                      <p class="text-xs italic">{content.info.trim()}</p>
                    </div>
                  ))}
                </>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div class="flex flex-col h-screen w-screen space-y-3">
      <Head>
        <title>Training Schedule</title>
        <meta
          name="description"
          content="Site to track your training regimen"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav
        id="header"
        class="bg-white border-gray-200 px-3 py-2.5 rounded dark:bg-gray-900"
      >
        <div class="container flex flex-wrap justify-between items-center mx-0">
          <a href="https://flowbite.com/" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Training Schedule
            </span>
          </a>
        </div>
      </nav>
      <div id="main" class="flex-grow px-3">
        <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase">
              <tr class="bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <th scope="col" class="py-3 px-6">
                  Monday
                </th>
                <th scope="col" class="py-3 px-6">
                  Tuesday
                </th>
                <th scope="col" class="py-3 px-6">
                  Wednesday
                </th>
                <th scope="col" class="py-3 px-6">
                  Thursday
                </th>
                <th scope="col" class="py-3 px-6">
                  Friday
                </th>
                <th scope="col" class="py-3 px-6">
                  Saturday
                </th>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
                <th scope="col" class="py-3 px-6">
                  Lower Body
                </th>
                <th scope="col" class="py-3 px-6">
                  Push
                </th>
                <th scope="col" class="py-3 px-6">
                  Pull / Posterior Chain
                </th>
                <th scope="col" class="py-3 px-6">
                  HIIT
                </th>
                <th scope="col" class="py-3 px-6">
                  Push
                </th>
                <th scope="col" class="py-3 px-6">
                  Lower
                </th>
              </tr>
            </thead>
            <tbody>{buildRows()}</tbody>
          </table>
        </div>
      </div>
      <div id="footer" class="p-3 text-center">
        2022 @ Sharynne Azhar
      </div>
    </div>
  );
}
