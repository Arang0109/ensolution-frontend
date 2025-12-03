import { useNavigate } from "react-router-dom";
import type { TeamResponse } from "@agency/model/agency.types";
import { deleteTeam } from "@agency/api/AgencyApi";

export const useTeamActions = (team: TeamResponse | null | undefined) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!team) return;
    // TODO: 수정 모달 또는 페이지로 이동
    console.log("Edit team:", team.id);
  };

  const handleDelete = async () => {
    if (!team) return;

    const confirmed = window.confirm(`'${team.name}' 팀을 삭제하시겠습니까?`);
    if (!confirmed) return;

    try {
      await deleteTeam(team.id);
      alert("팀이 삭제되었습니다.");
      navigate("/agency/teams");
    } catch (err) {
      alert("팀 삭제에 실패했습니다.");
      console.error(err);
    }
  };

  return { handleEdit, handleDelete };
};
