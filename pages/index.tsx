import { useEffect, useState } from "react";
import axios from "axios";

import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import { TaskProps } from "../src/models/models";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const Home: NextPage = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      const data = res.data;
      setTasks(Object.values(data));
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: Date.now(),
      task: task,
      status: "In Progress",
    };

    if (task) {
      axios.post(API_URL, data).then((res) => {
        setTasks([...tasks, data]);
        setTask("");
        alert("Task added");
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Streamframe | Task Management System</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/racocon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <p className="text-5xl font-medium pb-10">Task List</p>
        <div className="">
          <TaskForm task={task} setTask={setTask} handleSubmit={handleSubmit} />
        </div>
        <div className="">
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <span>
          <img className="ml-3 w-7 h-6" src="/peepo.gif" alt="Racocon" />
        </span>
      </footer>
    </div>
  );
};

export default Home;
