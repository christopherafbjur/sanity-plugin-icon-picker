import format, { plugins } from "pretty-format";
import renderer from "react-test-renderer";
import { IconObject } from "../types";
import type { ReactTestRendererJSON } from "react-test-renderer";

interface ObjectProps {
  [key: string]: string;
}

// Reference https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
const IGNORED_SVG_ATTRIBUTES = [
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "contentScriptType",
  "contentStyleType",
  "diffuseConstant",
  "edgeMode",
  "filterRes",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "referrerPolicy",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan",
];

const toKebabCase = (key: string) => {
  return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const mapObjectKeys = (obj: ObjectProps) =>
  Object.entries(obj).reduce((acc: ObjectProps, [key, value]) => {
    const keyHasIncorrectCasing = !IGNORED_SVG_ATTRIBUTES.includes(key);
    const newKey = keyHasIncorrectCasing ? toKebabCase(key) : key;

    acc[newKey] = value;

    return acc;
  }, {});

export const iconToSvgString = (icon: IconObject) => {
  const component = renderer
    .create(icon.component())
    .toJSON() as ReactTestRendererJSON;

  delete component.props.style;
  
  component.props = mapObjectKeys(component.props);

  return format(component, {
    plugins: [plugins.ReactTestComponent],
    printFunctionName: false,
    min: true,
  });
};
