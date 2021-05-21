import { PROVIDERS } from "../config";
import f7 from "./f7";
import fa from "./fa";
import mdi from "./mdi";
import sa from "./sa";

const f7Prefix = PROVIDERS.framework7.prefix;
const faPrefix = PROVIDERS.fontAwesome.prefix;
const mdiPrefix = PROVIDERS.materialDesign.prefix;
const saPrefix = PROVIDERS.sanity.prefix;

export default {
  [f7Prefix]: f7(f7Prefix),
  [faPrefix]: fa(faPrefix),
  [mdiPrefix]: mdi(mdiPrefix),
  [saPrefix]: sa(saPrefix),
};
