const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkout = () => {
  return DB.workouts;
};

const getOneWorkoutById = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return;
  }
  return workout;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (isAlreadyAdded) {
    return;
  }

  DB.workouts.push(newWorkout);

  saveToDatabase(DB);

  return newWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    return;
  }

  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-MX", { timeZone: "UTC" }),
  };

  DB.workouts[indexForUpdate] = updatedWorkout;

  saveToDatabase(DB);

  return updatedWorkout;
};

const deletedWorkout = (workoutId) => {
  const indexForDeleted = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForDeleted === -1) {
    return;
  }

  DB.workouts.splice(indexForDeleted, 1);

  saveToDatabase(DB);
};

module.exports = {
  getAllWorkout,
  getOneWorkoutById,
  createNewWorkout,
  updateOneWorkout,
  deletedWorkout,
};
