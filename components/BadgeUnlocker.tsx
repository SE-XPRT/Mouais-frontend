import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalBadge from "./ModalBadgeWin"; // Modale qui s'ouvre quand un badge est débloqué
import { resetLatestUnlocked } from "../reducers/badges";

const BadgeUnlocker: React.FC = () => {
  const dispatch = useDispatch();
  const latestUnlocked = useSelector((state: any) => state.badges.latestUnlocked);
  const [modalVisible, setModalVisible] = useState(false);

  // Quand latestUnlocked change (un nouveau badge débloqué)
  useEffect(() => {
    if (latestUnlocked) {
      setModalVisible(true);
    }
  }, [latestUnlocked]);

  // Fonction pour fermer la modale
  const handleClose = () => {
    setModalVisible(false);
    dispatch(resetLatestUnlocked()); // reset latestUnlocked dans le store
  };

  if (!latestUnlocked) return null; // pas de badge débloqué => pas d'affichage

  return (
    <ModalBadge
      visible={modalVisible}
      onClose={handleClose}
      message={`GG tu viens de débloquer le badge "${latestUnlocked.name}" ! 🎉`}
    />
  );
};

export default BadgeUnlocker;