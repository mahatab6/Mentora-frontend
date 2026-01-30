import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";

export default function profilePage() {
  const currentUser = {
    full_name: "Hello your",
    username: "Hekkkk",
    role: "Student",
  };

  return (
    <div className="max-w-2xl p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {currentUser.full_name?.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {currentUser.username}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {currentUser.role}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
