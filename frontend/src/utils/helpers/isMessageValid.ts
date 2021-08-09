export const isMessageValid = (message: string): { isValid: boolean, error: string } => {
  if (message.trim().replace(" ", "")==="") {
    return {error: "A message cannot be empty!", isValid: false}
  }
  return {error: "", isValid: true};
}

