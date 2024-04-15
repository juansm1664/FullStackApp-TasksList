import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
      toast.success("tarea Creada", {
        position: "bottom-right",
        style: {
          background: "green",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const resp = await getTask(params.id);
        setValue("title", resp.data.title);
        setValue("description", resp.data.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className=" max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="tittle"
          {...register("title", { required: true })}
          className="bg-stone-500 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>this field is required</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-stone-500 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>this field is required</span>}

        <button className="bg-fuchsia-600 p-3 rounded-lg block w-full mt-3">
          
          Save</button>
      </form>

      {params.id && (
        <div className=" flex justify-end">
          <button
        className="bg-red-500 p-3 rounded-g w-48 mt-3"
          onClick={async () => {
            const accepted = window.confirm("are you sure?");
            if (accepted) {
              await deleteTask(params.id);
              toast.success("tarea eliminada!", {
                position: "bottom-right",
                style: {
                  background: "green",
                  color: "#fff",
                },
              });
              navigate("/tasks");
            }
          }}
        >
          Delente
        </button>
        </div>
      )}
    </div>
  );
}
