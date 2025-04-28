using System;
using backend.Core.Interfaces;
namespace  backend.Core.Services
{
  
    public class CustomLogger:ICustomLogger
    {
        private readonly string _contextName;

        public CustomLogger(string contextName)
        {
            _contextName=contextName;
        }
         public void LogInfo(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[INFO] [{_contextName}] {DateTime.UtcNow}: {message}");
            Console.ResetColor();
        }

        public void LogWarning(string message)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[WARNING] [{_contextName}] {DateTime.UtcNow}: {message}");
            Console.ResetColor();
        }

        public void LogError(string message, Exception ex = null!)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR] [{_contextName}] {DateTime.UtcNow}: {message}");
            if (ex != null)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
            Console.ResetColor();
        }
    }
     
}