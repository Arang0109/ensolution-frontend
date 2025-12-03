import type { UserResponse } from "@auth/model";

interface TeamMemberListCardProps {
  users: UserResponse[];
}

export const TeamMemberListCard = ({ users }: TeamMemberListCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">팀원 목록 ({users.length}명)</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-8">등록된 팀원이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="text-sm text-gray-500">
                {user.role}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
