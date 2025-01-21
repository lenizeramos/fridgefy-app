const AddToFridge = () => {
  return (
    <>
      <h2>Add to my fridge</h2>
      <p>Enter item details you want to add to your fridge.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value=""
            placeholder="Search for a name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date:
          </label>
          <input
            type="date"
            id="expiryDate"
            className="form-control"
            value=""
          />
        </div>

        <button type="submit" className="addToFridgeBtn">
          Add To Fridge
        </button>
      </form>
    </>
  );
};

export default AddToFridge;
