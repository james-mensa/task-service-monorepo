import { RouterProvider } from "react-router-dom";
import AppRouter from "./app-routers";
import { observer } from "mobx-react-lite";
import { PageDialogController } from "@components/models";
const App = observer(() => {
  return (
    <div className="App">
      <RouterProvider
        router={AppRouter}
        future={{ v7_startTransition: true }}
      />
      <PageDialogController />
    </div>
  );
});

export default App;
