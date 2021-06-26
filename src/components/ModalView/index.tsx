import React, { ReactNode } from "react";
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from "react-native";

import { styles } from "./styles";

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
  logout?: boolean;
};

export function ModalView({ children, closeModal, logout, ...rest }: Props) {
  return (
    <Modal transparent statusBarTranslucent animationType={"slide"} {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.container,
              {
                marginTop: logout ? "100%" : 100,
              },
            ]}
          >
            <View
              style={[
                styles.background,
                {
                  marginTop: logout ? "70%" : 100,
                },
              ]}
            >
              <View style={styles.bar} />
              {children}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
