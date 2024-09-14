import { Button } from "flowbite-react";
import React from "react";

function Support() {
  return (
    <div className="p-3">
      <h3 className="text-xl mb-xl mb-4"> Hello World !</h3>
      <div className="flex gap-3 flex-col">
        <p className="text-sm text-gray-400">
          Your support fuels our efforts to continue sharing these vital
          teachings with the world. Together, let's inspire positive change and
          build a brighter future based on love, compassion, and unity. Thank
          you for considering supporting our noble cause.
        </p>
        <Button>Support Our Work</Button>
      </div>
    </div>
  );
}

export default Support;
