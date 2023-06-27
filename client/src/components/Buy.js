import { ethers } from 'ethers';

const Buy = ({state}) => {
  const buyChai = async (e) => {
    e.preventDefault();
    const {contract} = state;
    const name = document.getElementById("name").value;
    // const name = document.querySelector("#name").value;
    const message = document.getElementById("message").value;
    console.log(name, message, contract);

    try{
      const amount = {value: ethers.utils.parseEther('0.0001')};
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Transaction is done");
      // const tx = await contract.buyChai(name, message, {value: ethers.utils.parseEther("0.1")});
      // await tx.wait();
      // console.log("Transaction mined");
    }
    catch(error){
      console.log("Error in buying chai: ", error);
    }
  }
  return (
    // <div>
    //   <form onSubmit={buyChai} >
    //     <label>Name</label>
    //     <input type="text" id="name" placeholder="Enter your name" ></input>
    //     <label>Name</label>
    //     <input type="text" id="message" placeholder="Enter your Message" ></input>
    //     <button type="submit" >Pay</button>
    //   </form>
    // </div>
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <div style={{textAlign:'center'}}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!state.contract}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Buy;