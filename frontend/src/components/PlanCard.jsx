function PlanCard({ type }) {
    const [mealType, setMealType] = useState("veg");
    const [portion, setPortion] = useState("medium");
    const [timeSlot, setTimeSlot] = useState("Lunch");
  
    return (
      <div className="card">
        <h3>{type} Plan</h3>
        <div>
          <label>
            <input type="radio" value="veg" checked={mealType === "veg"} onChange={() => setMealType("veg")} />
            Veg
          </label>
          <label>
            <input type="radio" value="nonveg" checked={mealType === "nonveg"} onChange={() => setMealType("nonveg")} />
            Non-Veg
          </label>
        </div>
        <div>
          Portion Size:
          <select onChange={e => setPortion(e.target.value)} value={portion}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div>
          Time Slot:
          <select onChange={e => setTimeSlot(e.target.value)} value={timeSlot}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </div>
        <button onClick={() => alert("Go to Customize")}>Subscribe</button>
      </div>
    );
  }

  
  export default PlanCard;