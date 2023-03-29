import styled from "styled-components";
import { getSpacing } from "styles";

export const StyledPayoutFormPage = styled.div`
  position: relative;
  background: var(--background-clear-blue);
  padding: ${getSpacing(3)};
  border-radius: ${getSpacing(0.5)};
  margin-bottom: ${getSpacing(6)};
  color: var(--white);

  .title-container {
    display: flex;
    justify-content: space-between;
    margin-top: ${getSpacing(1)};

    .title {
      display: flex;
      align-items: center;
      color: var(--white);
      font-size: var(--moderate);
      margin-bottom: ${getSpacing(5)};
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        opacity: 0.8;
      }

      p {
        margin-left: ${getSpacing(1)};

        span {
          font-weight: 700;
        }
      }
    }
  }

  .section-title {
    color: var(--white);
    font-size: var(--small);
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: ${getSpacing(2)};
    padding-bottom: ${getSpacing(2)};
    border-bottom: 1px solid var(--grey-600);
  }

  .lastModifiedOn {
    position: absolute;
    margin: 0;
    top: 0;
    right: ${getSpacing(2)};
    color: var(--grey-400);
    background: var(--grey-600);
    font-size: var(--xxsmall);
    padding: ${getSpacing(0.6)} ${getSpacing(1.4)};
    border-radius: 5px;
    transform: translateY(-50%);
    cursor: default;
  }
`;

export const StyledPayoutForm = styled.div`
  background: var(--background-clearer-blue);
  border-radius: 4px;
  padding: ${getSpacing(2.5)};
`;
