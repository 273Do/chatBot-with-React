import { useEffect, useState } from "react";

import { CalendarDays, House } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { RoomsType } from "../type";

import { useAppDispatch } from "@/app/hooks";
import { setRoomInfo } from "@/features/RoomSlice";
import useCreateRoom from "@/functions/useCreateRoom";

// ダイアリーモード時のサイドバー表示
const ModeDiary = ({
  isOpen,
  rooms,
}: {
  isOpen: boolean;
  rooms: RoomsType[];
}) => {
  // カレンダーで選択した日付を取得
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dispatch = useAppDispatch();
  const { createRoom } = useCreateRoom();

  useEffect(() => {
    // 今日ルームを作成 / 選択した日のルームの移動
    createTodayRoomAndModeRoom();
  }, [date]);

  // MEMO: 今日の日付のルームが存在しない場合は作成する
  const createTodayRoomAndModeRoom = async () => {
    // 選択した日付のルームが存在するか確認
    const existRoom = rooms.find(
      (item) =>
        new Date(item.room.createdAt.toDate()).toDateString() ===
        date?.toDateString()
    );

    // MEMO: 選択した日付のルームがない場合は対応したルームを作成する
    if (!existRoom) {
      if (date === undefined) return;

      // ルーム名を日付にする
      const roomName = `${date?.getFullYear()}-${
        (date?.getMonth() ?? 0) + 1
      }-${date?.getDate()}`;

      // ルームを作成しstateに保存
      await createRoom(
        roomName,
        "",
        new Date(
          date?.getFullYear() ?? 0,
          date?.getMonth() ?? 0,
          date?.getDate() ?? 0
        )
      );
    } else {
      // ルーム情報をstateに保存
      dispatch(
        setRoomInfo({
          room_id: existRoom.room.id,
          room_name: existRoom.room.roomName,
          room_mode: existRoom.room.mode,
        })
      );
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarGroupLabel className="gap-2 text-xs font-normal text-muted-foreground">
        <CalendarDays size={16} />
        Calendar
      </SidebarGroupLabel>
      <SidebarMenuItem>
        {isOpen && (
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            className="bg-card-muted mb-2 rounded-lg border"
            selected={date}
            onSelect={setDate}
            fromYear={1960}
            toYear={2030}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        )}
      </SidebarMenuItem>
      <SidebarMenuButton onClick={() => setDate(new Date())}>
        <House size={16} />
        今日のルームを表示
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ModeDiary;
