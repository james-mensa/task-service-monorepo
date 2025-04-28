using System;
namespace backend.Core.Interfaces
{
    public interface ICustomLogger
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(string message, Exception ex = null);
    }
}
