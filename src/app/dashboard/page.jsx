import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen my-10">
      <h1 className="text-4xl font-bold my-10 text-center ">Dashboard</h1>
      <div className="flex gap-5 justify-between">
        <div className="p-5 w-150 bg-slate-300 text-center rounded-lg">
          <Link href="/dashboard/addpet">
            <Button variant="tertiary" color="primary">
              Add Pet
            </Button>
          </Link>
        </div>
        <div className="p-5 w-150 bg-green-100 text-center rounded-lg">
          <Link href="/dashboard/mylistings">
            <Button variant="secondary" color="primary">
              My Listings
            </Button>
          </Link>
        </div>
        <div className="p-5 w-150 bg-blue-100 text-center rounded-lg">
          <Link href="/dashboard/myrequest">
            <Button variant="secondary" color="primary">
              My Requests
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
