import { RecordingComponent } from "./pages/recording/recording.component";
import { ListeningComponent } from "./pages/listening/listening.component";
import { FileListComponent } from "./pages/file-list/file-list.component";

export const Routes =[
    {path:"",component:RecordingComponent},
    {path:"app-listening",component:ListeningComponent},
    {path:"app-file-list",component:FileListComponent}
]

export const RouterExtensions=[
    RecordingComponent,
    ListeningComponent,
    FileListComponent
]