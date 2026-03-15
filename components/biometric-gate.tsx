import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  ScanFace,
  Fingerprint,
  ShieldOff,
  AlertCircle,
  Info,
  Scan,
} from "lucide-react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useBiometrics } from "@/hooks/use-biometrics";

interface BiometricGateProps {
  onAuthenticated: () => void;
}

export default function BiometricGate({ onAuthenticated }: BiometricGateProps) {
  const {
    isAuthenticated,
    isChecking,
    error,
    errorMessage,
    hasHardware,
    isEnrolled,
    supportedTypes,
    authenticate,
  } = useBiometrics();

  const hasAutoTriggered = React.useRef(false);

  useEffect(() => {
    if (!isChecking && hasHardware && isEnrolled && !isAuthenticated && !hasAutoTriggered.current) {
      hasAutoTriggered.current = true;
      authenticate();
    }
  }, [isChecking, hasHardware, isEnrolled, authenticate, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      onAuthenticated();
    }
  }, [isAuthenticated, onAuthenticated]);

  const isHardError = error === "not_available" || error === "not_enrolled";

  const renderIcon = () => {
    if (isHardError) {
      return <ShieldOff size={48} color="#ef4444" />;
    }
    if (error && error !== "cancelled") {
      return <AlertCircle size={48} color="#f59e0b" />;
    }
    
    // Default to a generic scan icon if checking and we don't know types yet
    if (isChecking && supportedTypes.length === 0) {
      return <Fingerprint size={48} color="#3b82f6" />;
    }

    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return <ScanFace size={48} color="#3b82f6" />;
    }

    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return <Fingerprint size={48} color="#3b82f6" />;
    }

    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return <Scan size={48} color="#3b82f6" />;
    }

    return <ScanFace size={48} color="#3b82f6" />;
  };

  const renderTitle = () => {
    if (isHardError) return "Security Required";
    if (error === "lockout") return "Account Locked";
    if (error === "cancelled") return "Auth Suspended";
    if (error === "auth_failed") return "Try Again";
    return "Secure Access";
  };

  const renderSubtitle = () => {
    if (errorMessage) return errorMessage;
    if (isChecking && !hasHardware) return "Verifying security protocols…";

    const hasFace = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
    const hasFingerprint = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
    
    if (hasFace && hasFingerprint) return "Please verify your identity using Face ID or Touch ID to continue.";
    if (hasFace) return "Please verify your identity using Face ID to continue.";
    if (hasFingerprint) return "Please verify your identity using Fingerprint to continue.";
    
    return "Please verify your identity to continue.";
  };

  return (
    <View className="absolute inset-0 bg-background items-center justify-center px-8 z-[999]">
      <View
        className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full"
        pointerEvents="none"
      />
      <View
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full"
        pointerEvents="none"
      />
      
      <View className="w-full max-w-[380px] bg-card rounded-[40px] p-8 items-center">
        <View className="w-24 h-24 bg-primary/5 rounded-full items-center justify-center mb-8 border border-primary/10">
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center">
            {renderIcon()}
          </View>
        </View>

        <Text className="text-foreground text-3xl font-bold text-center mb-3 tracking-tight">
          {renderTitle()}
        </Text>
        
        <Text className="text-muted-foreground text-base text-center leading-6 mb-10 px-2">
          {renderSubtitle()}
        </Text>

        {isChecking && !error ? (
          <View className="h-14 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : !isHardError ? (
          <TouchableOpacity
            className={[
              "w-full h-16 flex-row items-center justify-center rounded-2xl gap-2",
              error === "lockout" ? "bg-muted" : "bg-primary"
            ].join(" ")}
            onPress={authenticate}
            disabled={error === "lockout"}
            activeOpacity={0.8}
          >
            {supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) ? (
              <ScanFace size={22} color="#ffffff" className="mr-3" />
            ) : (
              <Fingerprint size={22} color="#ffffff" className="mr-3" />
            )}
            <Text className="text-white text-lg font-bold tracking-tight">
              {error ? "Retry Auth" : "Unlock Now"}
            </Text>
          </TouchableOpacity>
        ) : null}

        {error === "not_enrolled" && (
          <View className="rounded-2xl p-3 border border-border flex-row items-start gap-1.5">
            <Info size={18} color="#3b82f6" />
            <View className="flex-1">
              <Text className="text-foreground font-semibold text-sm mb-1">
                Setup Required
              </Text>
              <Text className="text-muted-foreground text-xs leading-5">
                On simulator: Features → Face ID/Touch ID → Enrolled. On device: Check security settings.
              </Text>
            </View>
          </View>
        )}

        {error === "not_available" && (
          <View className="rounded-2xl p-5 mt-8 border border-border flex-row items-start gap-1.5">
            <Info size={18} color="#ef4444" />
            <View className="flex-1">
              <Text className="text-destructive font-semibold text-sm mb-1">
                Hardware Missing
              </Text>
              <Text className="text-muted-foreground text-xs leading-5">
                Secure hardware was not detected. Please use a supported device.
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className="absolute bottom-12 items-center">
        <Text className="text-muted-foreground/40 text-xs font-medium uppercase tracking-[3px]">
          KimiBank
        </Text>
      </View>
    </View>
  );
}