import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { t } from "ttag";
import ActionButton from "metabase/components/ActionButton";
import { getErrorMessage } from "metabase/components/form/FormMessage";
import { ErrorMessage } from "./SendTestPulse.styled";

const propTypes = {
  pulse: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  testPulse: PropTypes.func.isRequired,
  normalText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const SendTestPulse = ({
  pulse,
  channel,
  testPulse,
  disabled,
  normalText,
  successText,
}) => {
  const [error, setError] = useState();

  const onTestPulse = useCallback(async () => {
    try {
      setError(null);
      await testPulse({ ...pulse, channels: [channel] });
    } catch (e) {
      setError(e);
    }
  }, [pulse, channel, testPulse]);

  return (
    <div>
      <ActionButton
        actionFn={onTestPulse}
        disabled={disabled}
        normalText={normalText}
        activeText={t`Sending…`}
        failedText={t`Sending failed`}
        successText={successText}
        forceActiveStyle={true}
      />
      {error && <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>}
    </div>
  );
};

SendTestPulse.propTypes = propTypes;

export default SendTestPulse;
