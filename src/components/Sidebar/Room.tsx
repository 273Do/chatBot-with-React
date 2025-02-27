import { Calendar, MessageSquare, MessageSquareQuote } from "lucide-react";

import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import EditMenu from "./EditMenu";
import { RoomsType } from "./type";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setRoomInfo } from "@/features/RoomSlice";

// defaultモード時のルーム表示コンポーネント
const Room = (room_info: RoomsType) => {
  const { id, room } = room_info;

  const dispatch = useAppDispatch();
  const room_id = useAppSelector((state) => state.room.room_id);

  return (
    <>
      <SidebarMenuSubItem className="flex h-7 w-full cursor-pointer items-center justify-between">
        <SidebarMenuSubButton
          className={`w-full ${id === room_id ? "bg-primary/20" : ""}`}
          asChild
          onClick={() =>
            dispatch(
              setRoomInfo({
                room_id: id,
                room_name: room.roomName,
                room_mode: room.mode,
                room_prompt: room.prompt,
              })
            )
          }
        >
          <a>
            {room.mode === 0 ? (
              <MessageSquare size={16} />
            ) : room.mode === 2 ? (
              <Calendar size={16} />
            ) : (
              <MessageSquareQuote size={16} />
            )}
            <span>{room.roomName}</span>
          </a>
        </SidebarMenuSubButton>
        <EditMenu {...room_info} />
      </SidebarMenuSubItem>
    </>
  );
};

export default Room;
