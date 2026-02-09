export const ComponentList = ({
  components,
  updateComponent,
  removeComponent,
  moveComponent,
}) => {
  return (
    <div>
      {components.map((component, index) => (
        <div key={index}>
          {/* Render your component type here */}
          <div>{component.type}</div>
          <button
            onClick={() =>
              updateComponent(index, {
                /* config */
              })
            }
          >
            Update
          </button>
          <button onClick={() => removeComponent(index)}>Remove</button>
          <button onClick={() => moveComponent(index, "left")}>
            Move Left
          </button>
          <button onClick={() => moveComponent(index, "right")}>
            Move Right
          </button>
        </div>
      ))}
    </div>
  );
};
