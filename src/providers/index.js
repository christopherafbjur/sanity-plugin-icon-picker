import { PROVIDERS } from "../config";
import f7 from "./f7";
import fa from "./fa";
import mdi from "./mdi";
import sa from "./sa";
import fab from "./fab";

const f7Prefix = PROVIDERS.framework7.prefix;
const faPrefix = PROVIDERS.fontAwesome.prefix;
const fabPrefix = PROVIDERS.fontAwesomeBrands.prefix;
const mdiPrefix = PROVIDERS.materialDesign.prefix;
const saPrefix = PROVIDERS.sanity.prefix;

export default {
  [f7Prefix]: f7(f7Prefix),
  [faPrefix]: fa(faPrefix),
  [fabPrefix]: fab(fabPrefix),
  [mdiPrefix]: mdi(mdiPrefix),
  [saPrefix]: sa(saPrefix),
};
