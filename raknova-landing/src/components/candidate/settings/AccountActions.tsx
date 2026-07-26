import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LogoutModal } from "@/components/auth/LogoutModal";

export function AccountActions() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-red-100 p-6">
      <h3 className="text-lg font-semibold text-red-600 mb-4">Account Actions</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Download My Data</p>
            <p className="text-xs text-gray-500">Get a copy of your data</p>
          </div>
          <Button variant="outline" size="sm">Download</Button>
        </div>
        <hr className="border-red-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">Delete Account</p>
            <p className="text-xs text-gray-500">Permanently delete your account and data</p>
          </div>
          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => setShowDeleteDialog(true)}>Delete</Button>
        </div>
        <hr className="border-red-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Log Out</p>
            <p className="text-xs text-gray-500">Sign out of your account</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowLogoutDialog(true)}>Log Out</Button>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Modal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} title="Delete Account">
        <p className="text-sm text-gray-600 mb-4">This action cannot be undone. All your data including profile, applications, and history will be permanently deleted.</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button variant="primary" size="sm" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => setShowDeleteDialog(false)}>Delete Forever</Button>
        </div>
      </Modal>

      {/* Logout Dialog */}
      <LogoutModal isOpen={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} onConfirm={() => setShowLogoutDialog(false)} />
    </div>
  );
}
