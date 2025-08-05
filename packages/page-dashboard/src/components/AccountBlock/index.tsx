import React,{ memo } from "react";
import AccountInfo from "./AccountInfo.js";

type Props = {
  address: string;
}

const AccountBlock = ({address}: Props) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <AccountInfo address={address} />
    </div>
  )
}

export default memo(AccountBlock);
