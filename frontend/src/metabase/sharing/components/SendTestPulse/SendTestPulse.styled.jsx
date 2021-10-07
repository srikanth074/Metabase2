import styled from "styled-components";
import { color } from "metabase/lib/colors";
import { space } from "metabase/styled-components/theme";

export const ErrorMessage = styled.div`
  color: ${color("error")};
  margin-top: ${space(1)};
`;
