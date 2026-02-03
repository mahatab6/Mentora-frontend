import { Button } from "@/components/ui/button";
import { userServices } from "@/services/users.services";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Calendar,
  ShieldCheck,
  UserCircle,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { adminDashboard } from "@/services/admin/adminDashboard.services";
import { CreateProfile } from "./createProfie";
import { UpdateProfile } from "./updateProfile";

export default async function profilePage() {
  const session = await userServices.getSession();
  const user = session?.user;

  if (!user)
    return (
      <div className="p-10 text-center">
        Please log in to view your profile.
      </div>
    );
  const id = user?.id;
  const data = await adminDashboard.getTutorById(id);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Account Overview
          </h2>
          <p className="text-slate-500">
            Manage your personal information and settings.
          </p>
        </div>
        {data?.data?.id ? (
          <UpdateProfile id={id}/>
        ) : (
          <CreateProfile/>
        )}
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-xl overflow-hidden">
          <div className="h-32 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <CardContent className="relative pt-0 pb-8 px-8">
            <div className="flex flex-col sm:flex-row items-end -mt-12 gap-6">
              <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-slate-100 text-indigo-600 text-2xl font-bold">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="pb-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h3 className="text-2xl font-bold text-slate-800">
                    {user.name}
                  </h3>
                  <Badge className="bg-indigo-100 text-indigo-700 border-none hover:bg-indigo-100 uppercase text-[10px] tracking-wider font-bold">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>
            </div>

            <hr className="my-8 border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    User ID
                  </p>
                  <p className="text-sm font-mono text-slate-700 truncate max-w-[150px]">
                    {user.id}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Member Since
                  </p>
                  <p className="text-sm text-slate-700">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${user.emailVerified ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Verification
                  </p>
                  <p className="text-sm text-slate-700">
                    {user.emailVerified
                      ? "Verified Account"
                      : "Action Required"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
