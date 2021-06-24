import React from "react";
import { View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: Props) {
  return (
    <RectButton {...rest} style={styles.container}>
      <View style={[styles.content, { opacity: checked ? 1 : 0.4 }]}>
        {hasCheckBox && (
          <View style={checked ? styles.checked : styles.check} />
        )}

        <Icon
          width={48}
          height={48}
          style={{ marginTop: hasCheckBox ? -10 : 13 }}
        />

        <Text style={styles.title}>{title}</Text>
      </View>
    </RectButton>
  );
}
