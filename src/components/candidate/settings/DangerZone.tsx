import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LogoutModal } from "@/components/auth/LogoutModal";

export function DangerZone() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>

      <div className="p-4 border border-red-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Delete Account</p>
            <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
          </div>
          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => setShowDeleteModal(true)}>
            Delete
          </Button>
        </div>

        <hr className="border-red-100" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Logout</p>
            <p className="text-xs text-gray-500">Sign out of your account</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowLogoutModal(true)}>
            Logout
          </Button>
        </div>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account">
        <p className="text-sm text-gray-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="primary" size="sm" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => setShowDeleteModal(false)}>Delete Forever</Button>
        </div>
      </Modal>

      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={() => setShowLogoutModal(false)} />
    </div>
  );
}
