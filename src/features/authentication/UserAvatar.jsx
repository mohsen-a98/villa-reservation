import { useUser } from "./useUser";

function UserAvatar() {
  const { user, isLoading } = useUser();
  const { avatar, fullName } = (user && user.user_metadata) || {};

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={`avatar ${fullName}`}
        className={"aspect-square w-9 rounded-full object-cover object-center"}
      />

      <span className="text-gray-800 dark:text-gray-100">{fullName}</span>
    </div>
  );
}

export default UserAvatar;
