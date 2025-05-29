import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalBadge from "./ModalBadgeWin";
import { resetLatestUnlocked } from "../reducers/badges";

const BadgeUnlocker: React.FC = () => {
  const dispatch = useDispatch();
  const latestUnlocked = useSelector(
    (state: any) => state.badges.latestUnlocked
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Gestion de l'affichage de la modale
  useEffect(() => {
    console.log("Dernier badge débloqué :", latestUnlocked);
    if (latestUnlocked) {
      setModalVisible(true);
    }
  }, [latestUnlocked]);

  // Fermeture de la modale
  const handleClose = () => {
    setModalVisible(false);
    dispatch(resetLatestUnlocked());
  };

  if (!latestUnlocked) return null;

  return (
    <ModalBadge
      visible={modalVisible}
      onClose={handleClose}
      message={`GG tu viens de débloquer le badge "${latestUnlocked.name}" ! 🎉`}
      badge={latestUnlocked}
    />
  );
};

export default BadgeUnlocker;
