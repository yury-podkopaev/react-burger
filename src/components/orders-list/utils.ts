  export const getStatusColor = (status: string) =>
    status === "cancelled"
      ? "red"
      : status === "done"
      ? "#00CCCC"
      : "white";
