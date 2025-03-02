import { instance } from "@/utils/axios";
import { CreateMeetingRoom } from "./create-meeting-room-modal";

export async function meetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  return await instance.get("/meeting-room/list", {
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });
}

export async function deleteMeetingRoom(id: number) {
  return await instance.delete("/meeting-room/" + id);
}

export async function createMeetingRoom(meetingRoom: CreateMeetingRoom) {
  return await instance.post("/meeting-room/create", meetingRoom);
}

export async function updateMeetingRoom(meetingRoom: CreateMeetingRoom) {
  return await instance.put("/meeting-room/update", meetingRoom);
}

export async function findMeetingRoom(id: number) {
  return await instance.get("/meeting-room/" + id);
}
