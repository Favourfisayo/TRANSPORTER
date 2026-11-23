"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { AlertDialog, Modal, ModalBody, ModalFooter, ModalHeader, ModalTrigger } from "@THE-TRANSPORTER/ui/components/base/modal/modal";
import { formSchemas, submitDemoForm } from "@/lib/form-validation";
import { validateNewPassword } from "../../lib/account-validation";

const fieldClass = "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5";
const actionClass = "h-11 rounded-full px-5";

export function AddPlaceDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <ModalTrigger>
      {trigger}
      <Modal>
        {({ close }) => (
          <>
            <ModalHeader title="Add a place" description="Save a location to choose quickly when you book." />
            <ModalBody>
              <form id="add-place-form" className="grid gap-4" onSubmit={(event) => submitDemoForm(event, formSchemas.place, "Saving places is coming soon. Nothing has been saved.")}>
                <Input name="name" label="Place name" placeholder="e.g. Home or Office" maxLength={80} isRequired fieldClassName={fieldClass} />
                <Input name="address" label="Address" placeholder="Enter a location in Lagos" autoComplete="street-address" maxLength={200} isRequired fieldClassName={fieldClass} />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={close} className={actionClass}>Cancel</Button>
              <Button type="submit" form="add-place-form" className={actionClass}>Save place</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}

export function RemovePlaceDialog({ trigger, placeName }: { trigger: ReactNode; placeName: string }) {
  return (
    <ModalTrigger>
      {trigger}
      <AlertDialog
        title={`Remove ${placeName}?`}
        description="This place will no longer appear in your saved places."
        confirmLabel="Remove place"
        onConfirm={() => { toast.info("Removing places is coming soon. Nothing has been removed."); }}
      />
    </ModalTrigger>
  );
}

function PasswordForm() {
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const errorMessage = validateNewPassword(
      String(fields.get("new-password") ?? ""),
      String(fields.get("confirm-password") ?? ""),
    );
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError("");
    toast.info("Password changes are coming soon. Your password has not been changed.");
  }
  return (
    <form id="change-password-form" className="grid gap-4" onSubmit={submit}>
      <Input label="Current password" name="current-password" type="password" autoComplete="current-password" isRequired fieldClassName={fieldClass} />
      <Input label="New password" name="new-password" type="password" autoComplete="new-password" minLength={8} isRequired onChange={() => setError("")} hint="Use at least 8 characters you don’t use anywhere else." fieldClassName={fieldClass} />
      <Input label="Confirm new password" name="confirm-password" type="password" autoComplete="new-password" minLength={8} isRequired onChange={() => setError("")} isInvalid={!!error} errorMessage={error || undefined} fieldClassName={fieldClass} />
    </form>
  );
}

export function ChangePasswordDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <ModalTrigger>
      {trigger}
      <Modal>
        {({ close }) => (
          <>
            <ModalHeader title="Change password" description="Choose a strong password to keep your account secure." />
            <ModalBody><PasswordForm /></ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={close} className={actionClass}>Cancel</Button>
              <Button type="submit" form="change-password-form" className={actionClass}>Update password</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
