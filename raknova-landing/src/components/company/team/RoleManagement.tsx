import { roles } from "@/data/company/team";

export function RoleManagement() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Roles</h2>
      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.role} className="p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{role.role}</h3>
              <span className="text-xs text-gray-500">{role.users} user{role.users !== 1 ? "s" : ""}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1"><span className="font-medium">Responsibilities:</span> {role.responsibilities}</p>
            <p className="text-xs text-gray-600"><span className="font-medium">Permissions:</span> {role.permissions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
