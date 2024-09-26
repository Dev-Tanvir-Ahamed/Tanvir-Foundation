import React from "react";
import { capitalizeName } from "@/utils/capitalizeName";

interface UserNameProps {
  name: string;
}

const UserName: React.FC<UserNameProps> = ({ name }) => {
  return <h1>{capitalizeName(name)}</h1>;
};

export default UserName;
