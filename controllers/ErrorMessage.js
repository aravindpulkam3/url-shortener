export const errorMessage =async (req,res)=>{
  console.log("error error!!")
  return res.status(404).json("unexpected error occured");
}