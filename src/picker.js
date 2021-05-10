import React, { useState, useEffect } from "react";
import { PatchEvent, set, unset } from "part:@sanity/form-builder/patch-event";
import {
  Card,
  TextInput,
  Grid,
  Inline,
  Button,
  Dialog,
  Box,
  Container,
} from "@sanity/ui";
import * as Icons from "framework7-icons/react";
import FormField from "part:@sanity/components/formfields/default";
import styles from "framework7-icons";

console.log("STYLES", styles);

// const iconsArray = [Icons.Airplane, Icons.Alarm, Icons.AntCircleFill];
const IconPicker = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [popupOpen, setPopupOpen] = useState(true);
  const [icons, setIcons] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("icon picker mounted");
    const icons = Object.values(Icons)
      .map(({ name }) => pascalToSnakeCase(name))
      .splice(0, 100);

    setSelectedIcon(value);
    setIcons(icons);
    setResults(icons);
  }, []);

  const unsetIcon = () => {
    onChange(PatchEvent.from(unset()));
    setSelectedIcon(null);
  };

  const onOpen = () => {
    setPopupOpen(true);
  };
  const onClose = () => {
    setPopupOpen(false);
  };
  const onIconSelect = (icon) => {
    if (icon === selectedIcon) return unsetIcon();

    onChange(PatchEvent.from(set(icon)));
    setSelectedIcon(icon);
  };
  const onQueryChange = (e) => {
    const value = e.target.value;

    const results = icons.filter((icon) => icon.indexOf(value) >= 0);
    setResults(results);
    setSearchQuery(value);
  };
  const onPreviewIconClick = () => {
    //Open popup
    console.log("onPreviewOnClick");
    setPopupOpen(true);
  };

  const renderIcon = (icon) => {
    return <i className={styles["f7-icons"]}>{icon}</i>;
  };

  return (
    <FormField label={type.title} description={type.description}>
      <Card>
        <Inline space={[3, 3, 4]} style={{ margin: "10px 0px" }}>
          {selectedIcon && (
            <Card onClick={onPreviewIconClick}>{renderIcon(selectedIcon)}</Card>
          )}
          {!selectedIcon && (
            <Button
              fontSize={[2, 2, 3]}
              /* icon={AddIcon} */
              mode="ghost"
              padding={[3, 3, 4]}
              tone="brand"
              text="Add an icon"
              onClick={onOpen}
            />
          )}
          {selectedIcon && (
            <Button
              fontSize={[2, 2, 3]}
              /* icon={AddIcon} */
              mode="ghost"
              padding={[3, 3, 4]}
              text="Remove icon"
              tone="critical"
              onClick={unsetIcon}
            />
          )}

          {popupOpen && (
            <Dialog
              header="Icon Picker"
              id="icon-popup"
              onClose={onClose}
              zOffset={1000}
              width={100}
            >
              <Box padding={4}>
                <Card padding={[3, 3, 4]} paddingBottom={[8, 8, 9]}>
                  <TextInput
                    fontSize={[2, 2, 3, 4]}
                    padding={[3, 3, 4]}
                    value={searchQuery}
                    onChange={onQueryChange}
                  />
                  <Container height="stretch">
                    <Box marginTop={4}>
                      <Grid rows={4} columns={[2, 3, 4, 6]} gap={[2, 2, 2, 2]}>
                        {results &&
                          results.map((result) => {
                            return (
                              <Button
                                fontSize={[2, 2, 3]}
                                /* icon={AddIcon} */
                                mode="ghost"
                                padding={[3, 3, 4]}
                                tone="default"
                                text={renderIcon(result)}
                                onClick={() => onIconSelect(result)}
                                selected={result === selectedIcon}
                              />
                            );
                          })}
                      </Grid>
                    </Box>
                  </Container>
                </Card>
              </Box>
            </Dialog>
          )}
        </Inline>
      </Card>
    </FormField>
  );
});

function pascalToSnakeCase(string) {
  return string
    .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}

export default IconPicker;
