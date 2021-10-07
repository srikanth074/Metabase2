import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { t } from "ttag";
import ActionButton from "metabase/components/ActionButton";
import FormMessage from "metabase/components/form/FormMessage";

const propTypes = {
  channel: PropTypes.object.isRequired,
  pulse: PropTypes.object.isRequired,
  testPulse: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  normalText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
};

const SendTestPulse = ({
  channel,
  pulse,
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
      {error && (
        <FormMessage formError={error} />
      )}
    </div>
  );
};

SendTestPulse.propTypes = propTypes;

export default SendTestPulse;
